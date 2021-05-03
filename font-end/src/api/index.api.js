

import { UserApi } from './user.api';
import { PostApi } from './posts.api';
import { CommentApi } from './comment.api';
import { UploadApi } from './updateImage.api';
import { NotificationApi } from './notification.api';
class api {
   static userApi = new UserApi();
   static postApi = new PostApi();
   static commentApi = new CommentApi();
   static uploadApi = new UploadApi();
   static notificationApi = new NotificationApi();
}

export default api;