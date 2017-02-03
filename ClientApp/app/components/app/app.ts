import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([{
            route: [ '', 'home' ],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: '../home/home',
            nav: true,
            title: 'Home'
        }, {
            route: 'tasks',
            name: 'tasks',
            settings: { icon: 'tasks' },
            moduleId: '../tasks/tasks',
            nav: true,
            title: 'Tasks'
        }, {
            route: 'planning',
            name: 'planning',
            settings: { icon: 'th-list' },
            moduleId: '../planning/plans',
            nav: true,
            title: 'Planning'
        }, {
            route: 'allocation',
            name: 'allocation',
            settings: { icon: 'th-list' },
            moduleId: '../allocation/allocations',
            nav: true,
            title: 'Allocation'
        }]);

        this.router = router;
    }
}
