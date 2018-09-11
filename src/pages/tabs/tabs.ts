import { Component } from '@angular/core';

import { MyAccountPage } from '../my-account/my-account';
import { EventsPage } from '../events/events';
import { ContactsPage } from '../contacts/contacts';
import { WinnerPage } from '../winner/winner';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MyAccountPage;
  tab2Root = EventsPage;
  tab3Root = ContactsPage;
  tab4Root = WinnerPage;

  constructor() {

  }
}
