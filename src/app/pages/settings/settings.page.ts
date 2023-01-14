import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { NavController } from '@ionic/angular';
import { MqttSettings, INITIAL_MQTT_SETTINGS } from '../../interfaces/data.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  mqttForm: FormGroup;
  mqttSettingsForm: MqttSettings = INITIAL_MQTT_SETTINGS;
  private action: string;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.mqttForm = this.fb.group({
      mqtt_hostname: ['', Validators.required],
      mqtt_port: ['', Validators.required],
      mqtt_username: ['', Validators.required],
      mqtt_password: ['', Validators.required],
      mqtt_topic: ['', Validators.required]
    });

    this.storageService.settings$.subscribe(settings => {
      this.updateForm(settings.mqtt);
    });
  }

  ngOnInit() {
    // TODO Check action
    // this.action = this.route.snapshot.paramMap.get('action');
    // if (this.action === 'logout') this.logout();

    this.updateForm(this.mqttSettingsForm);
  }

  async updateForm(settings: MqttSettings) {
    if (settings) {
      this.mqttSettingsForm.hostname = settings.hostname;
      this.mqttSettingsForm.port = settings.port;
      this.mqttSettingsForm.username = settings.username;
      this.mqttSettingsForm.password = settings.password;
      this.mqttSettingsForm.topic = settings.topic;

      if (this.mqttForm) {
        this.mqttForm.setValue({
          'mqtt_hostname': settings.hostname,
          'mqtt_port': settings.port,
          'mqtt_username': settings.username,
          'mqtt_password': settings.password,
          'mqtt_topic': settings.topic
        })
      }
    }
  }

  async saveSettings() {
    const loading = await this.loadingController.create({
      cssClass: 'spinner',
      spinner: 'crescent',
      message: 'Please wait...'
    });

    await loading.present();
    let mqttSettings = await this.processFields(this.mqttForm);

    await this.storageService.saveSettings({
      mqtt: {
        hostname: mqttSettings.hostname,
        port: mqttSettings.port,
        username: mqttSettings.username,
        password: mqttSettings.password,
        topic: mqttSettings.topic,
      }
    });

    await loading.dismiss();
    this.navCtrl.navigateRoot('');

  }

  cancel() {
    this.navCtrl.navigateRoot('');
  }

  async reset() {
    await this.updateForm({
      hostname: '',
      port: null,
      username: '',
      password: '',
      topic: ''
    });
    this.storageService.cleanStorage();
  }

  private async processFields(mqttForm: FormGroup): Promise<MqttSettings> {
    let hostname: string = mqttForm.value.mqtt_hostname;
    let port: number = mqttForm.value.mqtt_port;

    if (hostname.includes("http://")) {    // check if user added prefix
      hostname = hostname.replace('http://', '');     // remove http from IP
    }

    if (hostname.match(":[0-9]{4,6}")) {   // check if user added port
      port = Number(hostname.split(':')[1]); // if given, override port
      hostname = hostname.split(':')[0]; // remove port from IP address
    }

    return ({
      hostname: hostname,
      port: port,
      username: mqttForm.value.mqtt_username,
      password: mqttForm.value.mqtt_password,
      topic: mqttForm.value.mqtt_topic
    });
  }

}
