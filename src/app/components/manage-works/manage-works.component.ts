import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Work } from 'src/app/interfaces/work';
import { DataService } from 'src/app/services/data.service';
import { pipe, catchError } from 'rxjs';

@Component({
  selector: 'app-manage-works',
  templateUrl: './manage-works.component.html',
  styleUrls: ['./manage-works.component.css'],
})
export class ManageWorksComponent implements OnInit {
  constructor(private data: DataService) {}
  loading: boolean = false;
  tabs: [string, string] = ['Works', 'Add Work'];
  activeTab: number = 0;
  allWorks: Work[] = [];
  dialogOpen: boolean = false;
  workFormGroup: any;
  action: string = 'Add';
  error: boolean = false;
  success: boolean = false;
  image!: File;

  ngOnInit(): void {
    this.getAllWorks();
    this.workFormGroup = new FormGroup({
      _id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      customerWebsite: new FormControl('', [
        Validators.required,
        Validators.pattern('https?://.+'),
      ]),
    });
  }

  get title() {
    return this.workFormGroup.get('title');
  }

  get description() {
    return this.workFormGroup.get('description');
  }

  get customerWebsite() {
    return this.workFormGroup.get('customerWebsite');
  }

  selectTab(tab: number) {
    this.activeTab = tab;
    if (tab === 1) {
      this.workFormGroup.patchValue({
        _id: '',
        title: '',
        description: '',
        visible: "",
        customerWebsite: '',
      });
    }
  }

  getAllWorks() {
    this.loading = true;
    this.data.getWorks().subscribe((data: any) => {
      this.allWorks = data;
      this.loading = false;
    });
  }

  toggleVisibility(work: Work) {
    this.data.toggleVisibility(work).subscribe((res: any) => {
      console.log(res);
      this.getAllWorks();
    });
  }

  openEditDialog(work: Work) {
    this.action = 'edit';
    this.dialogOpen = true;
    this.workFormGroup.patchValue({
      _id: work._id,
      title: work.title,
      description: work.description,
      customerWebsite: work.customerWebsite,
    });
    console.log(this.workFormGroup.value);
  }

  closeEditDialog() {
    this.dialogOpen = false;
  }

  onImageSelect(e: any) {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.image = inputElement.files[0];
    }
  }

  addWork() {
    this.loading = true;
    this.data.addWork(this.workFormGroup.value, this.image).pipe(catchError((err)=>{
      this.error = true
      setTimeout(()=>{
        this.error = false
      }, 3000)
      return err;
    })).subscribe((res: any) => {
      console.log(res);
      this.success = true
      setTimeout(()=>{
        this.success = false
      }, 2000)
      this.loading = false;
      this.workFormGroup.reset();
      this.getAllWorks();
    });

  }

  saveUpdatedWork() {
    this.data.updateWork(this.workFormGroup.value).subscribe((res: any) => {
      console.log(res);
      this.getAllWorks();
      this.closeEditDialog();
    });
  }

  deleteWork(work: Work) {
    this.data.deleteWork(work).subscribe((res: any) => {
      console.log(res);
      this.getAllWorks();
    });
  }
}
