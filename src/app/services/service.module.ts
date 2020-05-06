import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService } from './service.index';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login-guard';
import { UploadService } from './file/upload.service';
import { ModalUploadService } from '../pages/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [ CommonModule, HttpClientModule ],
  exports: [],
  providers: [ SettingsService, SidebarService, SharedService, UserService, LoginGuard, UploadService, ModalUploadService],
})
export class ServiceModule {}
