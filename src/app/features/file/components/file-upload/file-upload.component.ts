import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  public fileList: File[] = [];
  @Input() public active: boolean = true;

  private onChange!: (value: any) => void;

  @HostListener('change', ['$event.target.files']) emitFiles( fileList: FileList ) {
    const file: File = fileList[0];
    const isUnique = this.fileList.length > 0 ? !(this.fileList.some(fileItem => fileItem.name == file.name)) : true;
    if (isUnique) {
      this.fileList.push(file);
      this.onChange(this.fileList);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onRemoveFile(fileID: number) {
    this.fileList = this.fileList.filter((file, i) => i != fileID);
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

}
