from collections import defaultdict
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from .models import Message
from rest_framework import status
from rest_framework import viewsets
from .serializers import (
    MessageSerializer,
    MessageCreateSerializer
)
from rest_framework.views import APIView
from django.db import models


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.get_serializer().Meta.model.objects.all()
            return self.queryset
        else:
            return self.queryset

    def create(self, request):
        message_serializers = MessageCreateSerializer(data=request.data)
        if message_serializers.is_valid():
            message_serializers.save()
            return Response(message_serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(message_serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class UserMessagesViewSet(APIView):
    serializer_class = MessageSerializer

    def get(self, request, user_id):
        try:
            # Lấy tất cả tin nhắn mà người dùng gửi hoặc nhận
            messages = Message.objects.filter(
                models.Q(sender=user_id) | models.Q(receiver=user_id)
            )

            chats = defaultdict(
                lambda: {'last_message': None, 'unread_count': 0, 'last_message_time': None})

            for message in messages:
                # Lấy thông tin người gửi và người nhận
                sender = message.sender
                receiver = message.receiver

                # Tạo đối tượng participants
                if int(sender.id) == int(user_id):
                    participants = {'username': receiver.username,
                                    'first_name': receiver.first_name,
                                    'last_name': receiver.last_name,
                                    'id': receiver.id,
                                    'image_url': str(receiver.image),
                                    }
                else:
                    participants = {'username': sender.username,
                                    'first_name': sender.first_name,
                                    'last_name': sender.last_name,
                                    'id': sender.id,
                                    'image_url': str(sender.image)
                                    }

                # Thêm user_id để đảm bảo duy nhất
                chat_id = f'{participants["username"]}-{user_id}'
                if not chats[chat_id]['last_message']:
                    chats[chat_id]['chat_id'] = chat_id
                    # Sử dụng từ điển participants
                    chats[chat_id]['target'] = participants
                if not message.is_read and receiver.id == user_id:
                    chats[chat_id]['unread_count'] += 1
                chats[chat_id]['last_message'] = message.body
                chats[chat_id]['last_message_time'] = message.date

            chat_list = list(chats.values())

            chat_list_sorted = sorted(
                chat_list, key=lambda chat: chat['last_message_time'], reverse=True)

            return Response(chat_list_sorted)
        except Message.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ParticipantsMessagesViewSet(APIView):
    serializer_class = MessageSerializer

    def get(self, request, user1_id, user2_id):
        messages = Message.objects.filter(
            sender__in=[user1_id, user2_id],
            receiver__in=[user1_id, user2_id]
        ).order_by('-date')

        # Sử dụng serializer để biến đổi dữ liệu
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
