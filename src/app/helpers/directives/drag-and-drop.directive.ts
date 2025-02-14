import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
})
export class DragAndDropDirective {

  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.fileover')
  fileover: boolean = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileover = false;
  }

  @HostListener('drop', ['$event'])
  onDragDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.fileover = false;
    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
