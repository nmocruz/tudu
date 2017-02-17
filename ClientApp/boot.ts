import { Aurelia } from 'aurelia-framework';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'aurelia-bootstrapper';
import { PLATFORM } from 'aurelia-pal';
declare var IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
    aurelia
    .use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-grid'))
    .globalResources(PLATFORM.moduleName('app/components/main-screen/breadcrumb.html'))
    .globalResources(PLATFORM.moduleName('app/components/main-screen/page-header.html'));
    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    aurelia.start().then(() => aurelia.setRoot('app/components/app/app'));
}
