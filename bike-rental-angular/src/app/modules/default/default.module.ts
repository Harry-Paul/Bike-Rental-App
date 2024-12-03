import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgZorroImportsModule } from '../../NgZorroImportsModule'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component'

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule {}
