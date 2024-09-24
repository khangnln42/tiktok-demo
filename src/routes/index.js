import { HeaderLayout } from '~/components/Layouts';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

//các Routes ko cần login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderLayout },
    // { path: '/search', component: Search, layout: null },
];
//các Routes cần login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
