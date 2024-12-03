import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AdminService } from '../../services/admin.service'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Router } from '@angular/router'

@Component({
  selector: 'app-post-bike',
  templateUrl: './post-bike.component.html',
  styleUrl: './post-bike.component.scss'
})
export class PostBikeComponent {
  postBikeForm!: FormGroup
  isSpinning: boolean = false
  selectedFile: File | null = null
  imagePreview: string | ArrayBuffer | null = null
  listOfOption: Array<{ label: string; value: string }> = []
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus']
  listOfType = ['Sports Bike', 'Diesel', 'Crossover', 'Luxury Bike']
  listOfColor = ['Red', 'Blue', 'Brown', 'Green']
  listOfTransmission = ['Manual', 'Automatic']

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postBikeForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    })
  }

  postBike() {
    this.isSpinning = true

    const formData: FormData = new FormData()
    formData.append('image', this.selectedFile as Blob)
    formData.append('brand', this.postBikeForm.value.brand)
    formData.append('name', this.postBikeForm.value.name)
    formData.append('type', this.postBikeForm.value.type)
    formData.append('color', this.postBikeForm.value.color)
    formData.append('year', this.postBikeForm.value.year)
    formData.append('transmission', this.postBikeForm.value.transmission)
    formData.append('description', this.postBikeForm.value.description)
    formData.append('price', this.postBikeForm.value.price)

    this.adminService.postBike(formData).subscribe(
      res => {
        this.message.success('Bike posted successfully', { nzDuration: 3000 })
        this.isSpinning = false
        this.router.navigateByUrl('/admin/dashboard')
      },
      error => {
        this.message.error('Error posting bike', { nzDuration: 3000 })
        console.log(error)
      }
    )
  }

  onFileSelected($event: Event) {
    const target = $event.target as HTMLInputElement
    this.selectedFile = (target.files as FileList)[0]

    this.previewImage()
  }

  previewImage() {
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedFile as Blob)
  }
}
