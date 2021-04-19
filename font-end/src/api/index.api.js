

import { UserApi } from './user.api';
import { PostApi } from './posts.api';
class api {
   static userApi = new UserApi();
   static postApi = new PostApi();
}

export default api;