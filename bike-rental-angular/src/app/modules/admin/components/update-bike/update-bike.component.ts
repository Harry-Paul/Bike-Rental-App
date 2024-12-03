import { Component } from '@angular/core'
import { AdminService } from '../../services/admin.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-update-bike',
  templateUrl: './update-bike.component.html',
  styleUrl: './update-bike.component.scss'
})
export class UpdateBikeComponent {
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  isSpinning: boolean = false
  bikeId: number = this.activatedRoute.snapshot.params['id']
  imgChanged: boolean = false
  selectedFile: any = null
  imagePreview: string | ArrayBuffer | null = null
  existingImage: string | null = null
  updateForm!: FormGroup // ! is used to tell TypeScript that this variable will be initialized later
  listOfOption: Array<{ label: string; value: string }> = []
  listOfBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus']
  listOfType = ['Sports Bike', 'Diesel', 'Crossover', 'Luxury Bike']
  listOfColor = ['Red', 'Blue', 'Brown', 'Green']
  listOfTransmission = ['Manual', 'Automatic']

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    })

    this.getBikeById()
  }

  getBikeById() {
    this.isSpinning = true

    this.adminService.getBikeById(this.bikeId).subscribe(res => {
      this.isSpinning = false

      const bikeDto = res
      this.existingImage = `data:image/jpeg;base64,${bikeDto.returnedImage}`
      this.updateForm.patchValue(bikeDto)
    })
  }

  updateBike() {
    this.isSpinning = true

    const formData: FormData = new FormData()
    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile as Blob)
    }

    formData.append('brand', this.updateForm.value.brand)
    formData.append('name', this.updateForm.value.name)
    formData.append('type', this.updateForm.value.type)
    formData.append('color', this.updateForm.value.color)
    formData.append('year', this.updateForm.value.year)
    formData.append('transmission', this.updateForm.value.transmission)
    formData.append('description', this.updateForm.value.description)
    formData.append('price', this.updateForm.value.price)

    this.adminService.updateBike(this.bikeId, formData).subscribe(
      res => {
        this.message.success('Bike updated successfully', { nzDuration: 3000 })
        this.isSpinning = false
        this.router.navigateByUrl('/admin/dashboard')
      },
      error => {
        this.message.error('Error updating bike', { nzDuration: 3000 })
        console.log(error)
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
    this.imgChanged = true
    this.existingImage = null
    this.previewImage()
  }

  previewImage() {
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedFile)
  }
}
