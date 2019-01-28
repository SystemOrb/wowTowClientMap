import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProviderProfileService } from '../../../services/providers/provider-profile.service';
import { WooTowProviderProfile } from 'src/app/models/providers/provider.docs.class';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {
  public WooTowProfile: WooTowProviderProfile[] = [];
  constructor(public tracking: MatDialogRef<ServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public WootowProvider: any, private _provider: ProviderProfileService) { }

  async ngOnInit() {
    const resume = this.WootowProvider.RoutingData.Tracking;
    const driverProfile = await this.WooTowProviderProfile(resume.provider._id);
    if (driverProfile.length >= 1) {
      this.WooTowProfile = driverProfile;
      this.GetPublicProfile(this.WooTowProfile);
    }
    // console.log(resume.provider._id);
  }
  ngOnDestroy() {}
  /*
  Tenemos todos los datos necesarios del servicio excepto la foto del gruero y del vehiculo
  necesitamos mostrarle al usuario de forma grafica quien es el proveedor y la ruta
  asi que solicitamos los documentos publicos del gruero con el ID del proveedor
  */
  WooTowProviderProfile(WootowProvider_key: string): Promise<WooTowProviderProfile[]> {
    return new Promise((resolve, reject) => {
      this._provider.GetWooTowDocs(WootowProvider_key).subscribe(
        (profile: PartialObserver<any> | any): void => {
          if (profile.status) {
            resolve(profile.documents);
          } else {
            resolve([]);
          }
        }
      );
    });
  }
  // Función que se encarga de apartar los documentos que nos interesa mostrar
  GetPublicProfile(WootowDocsData: WooTowProviderProfile[]) {
    // Recorremos el arreglo de documentos
    for (const doc of WootowDocsData) {
      console.log(doc);
    }
  }
}
