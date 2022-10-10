import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  credentials: FormGroup;

  public loxberryMqttIP: string = '';
  public loxberryMqttPort: string = '';
  public loxberryMqttUsername: string = '';
  public loxberryMqttPassw: string = '';

  private action: string;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private storageService: StorageService,
    private route: ActivatedRoute
  )
  {
    this.storageService.getSettings().subscribe( settings =>
    {
      if (settings){
        this.loxberryMqttIP = settings.loxberryMqttIP;
        this.loxberryMqttPort = settings.loxberryMqttPort;
        this.loxberryMqttUsername = settings.loxberryMqttUsername;
        this.loxberryMqttPassw = settings.loxberryMqttPassw;
        this.updateFields();
      }
    });
  }

  ngOnInit() {
    // TODO Check action
    // this.action = this.route.snapshot.paramMap.get('action');
    // if (this.action === 'logout') this.logout();

    this.credentials = this.fb.group({
      mqtt_ipaddress: ['', Validators.required],
      mqtt_port: ['', Validators.required],
      mqtt_username: ['', Validators.required],
      mqtt_passw: ['', Validators.required]
    });

    // get initial values
    this.updateFields();
  }

  async updateFields() {
    if (this.credentials) {
      this.credentials.setValue({
          'mqtt_ipaddress': this.loxberryMqttIP,
          'mqtt_port': this.loxberryMqttPort,
          'mqtt_username': this.loxberryMqttUsername,
          'mqtt_passw': this.loxberryMqttPassw
      })
    }
  }

  async save_settings() {
    const loading = await this.loadingController.create({
      cssClass: 'spinner',
      spinner​: 'crescent',
      message: 'Please wait...'
    });

    await loading.present();

    this.loxberryMqttPassw = this.credentials.value.passw;
    await this.storageService.store(
    {
      loxberryMqttIP: this.credentials.value.mqtt_ipaddress,
      loxberryMqttPort: this.credentials.value.mqtt_port,
      loxberryMqttUsername: this.credentials.value.mqtt_username,
      loxberryMqttPassw: this.credentials.value.mqtt_passw,
    });

    await loading.dismiss();
  }

}
