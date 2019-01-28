import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceStatus'
})
export class ServiceStatusPipe implements PipeTransform {

  transform(ServiceStatus: string): string {
    switch (ServiceStatus) {
      case 'WAITING':
        return 'Waiting for a provider';
      case 'TAKEN':
        return 'Your Service has been accepted';
      case 'IN PROCESS':
        return 'Waiting for provider catch you';
      case 'ROUTING':
        return 'Your provider service is driving to second pointer';
      case 'COMPLETED':
        return 'Service Finished waiting for confirmation';
      default:
      return 'Waiting for a provider';
    }
  }
}
