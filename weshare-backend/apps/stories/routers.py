from rest_framework.routers import DefaultRouter
from .views import StoriesViewSet

router = DefaultRouter()
router.register(r'stories',StoriesViewSet, basename='stories')
urlpatterns = router.urls