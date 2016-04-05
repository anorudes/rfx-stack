import { observable, autorun } from 'mobx';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class UIStore {

  mui = {};

  @observable appNavIsOpen = true;
  @observable appBarMenuAccountIsOpen = false;

  @observable breakpoints = {
    xs: '(max-width: 767px)',
    su: '(min-width: 768px)',
    sm: '(min-width: 768px) and (max-width: 991px)',
    md: '(min-width: 992px) and (max-width: 1199px)',
    mu: '(min-width: 992px)',
    lg: '(min-width: 1200px)',
  };

  constructor(ui) {
    Object.assign(this, ui);

    // open and close the nav automatically
    // when the "xs" breakpoint changes
    autorun(() => this.breakpoints.xs
      ? this.toggleAppNav('close')
      : this.toggleAppNav('open')
    );
  }

  getMui() {
    const mui = global.CLIENT ? { userAgent: navigator.userAgent } : {};
    Object.assign(mui, lightBaseTheme);
    return getMuiTheme(this.mui, mui);
  }

  injectTapEv() {
    // Material-UI components use react-tap-event-plugin to listen for touch events
    // This dependency is temporary and will go away once react v1.0
    injectTapEventPlugin();
  }

  toggleAppNav(flag = null) {
    if (flag === 'open') this.appNavIsOpen = true;
    if (flag === 'close') this.appNavIsOpen = false;
    if (!flag) this.appNavIsOpen = !this.appNavIsOpen;
  }

  toggleAppBarMenuAccount(flag = null) {
    if (flag === 'open') this.appBarMenuAccountIsOpen = true;
    if (flag === 'close') this.appBarMenuAccountIsOpen = false;
    if (!flag) this.appBarMenuAccountIsOpen = !this.appBarMenuAccountIsOpen;
  }
}