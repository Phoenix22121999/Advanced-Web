

import { UserApi } from './user.api';
import { PostApi } from './post.api';
class api {
   static userApi = new UserApi();
   static postApi = new PostApi();
}

export default api;