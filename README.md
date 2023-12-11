<h1>Bài tập lớn môn lập trình Python</h1>

<h2>Weshare</h2>


>A social network (October 2023) made with Django, NextJS 13 & Docker.

# Preview

### Home Page:

![675shots_so](https://github.com/huydre/Weshare/assets/80162506/7656847e-4022-4c7c-b378-204c712917ef)

### Login:

![23shots_so](https://github.com/huydre/Weshare/assets/80162506/e78fc840-24d4-4c56-95b5-33709f960fea)



# Features

* Login, Register, Logout, Authentication
* HomePage
* Create new post with image
* Edit post
* Like, comment
* Message
* Story
* Follow

# To-do(s)
* Responsive
* Fix story
* Tag friend
* Create post with video

# 🧰Getting Started

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL`

### :gear: Installation

* Install Back-end
```
cd weshare-backend
```
```
docker-compose exec backend  sh
```
```
python manage.py migrate
```

* Install Front-end
```
cd weshare-frontend
```
```
npm i
```
```
npm run dev
```
