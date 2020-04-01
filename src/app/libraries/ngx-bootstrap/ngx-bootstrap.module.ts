import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// import { RatingModule } from 'ngx-bootstrap/rating';
// import { CollapseModule } from 'ngx-bootstrap/collapse';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    // BsDropdownModule.forRoot(),
    // CollapseModule.forRoot(),
    ModalModule.forRoot(),
    // CarouselModule.forRoot(),
    // TabsModule.forRoot(),
    // TypeaheadModule.forRoot(),
    // AccordionModule.forRoot(),
    // RatingModule.forRoot(),
    // PopoverModule.forRoot()
  ],
  exports: [
    // BsDropdownModule,
    ModalModule,
    // CarouselModule,
    // TypeaheadModule,
    // TabsModule,
    // AccordionModule,
    // RatingModule,
    // CollapseModule,
    // PopoverModule
  ],
})
export class NgxBootstrapModule { }
