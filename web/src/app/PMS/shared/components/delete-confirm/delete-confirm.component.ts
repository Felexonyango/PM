import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

enum UserAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT'
}

@Component({
  selector: 'app-popup',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss'],
  providers: [DialogService], 
})
export class DeleteConfirmComponent implements OnInit {

  constructor(
    public dialogService: DialogService,
    // public messageService: MessageService,
    public ref: DynamicDialogRef,
) {}

  ngOnInit(): void {
  }

  public deleteConfirmation(confirm: boolean) {
    this.ref.close(confirm);

  }
}
