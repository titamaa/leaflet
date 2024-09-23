import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  osmLayer!: L.TileLayer;
  satelliteLayer!: L.TileLayer;
  terrainLayer!: L.TileLayer;

  constructor() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.54056, 110.4463], 14);

    // Menambahkan TileLayer untuk OpenStreetMap
    this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map); // Menambahkan ke peta

    // Menambahkan TileLayer untuk Satelit
    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    });

    // Menambahkan TileLayer untuk Terrain
    this.terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors, SRTM'
    });

    // Menambahkan Layer Control
    const baseLayers = {
      'OpenStreetMap': this.osmLayer,
      'Satellite': this.satelliteLayer,
      'Terrain': this.terrainLayer
    };

    L.control.layers(baseLayers).addTo(this.map);

    // Menambahkan marker
    const marker = L.marker([-7.54056, 110.4463]).addTo(this.map);
    marker.bindPopup('Puncak Merapi').openPopup();
  }
}
