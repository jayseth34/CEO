import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HubEvent {
  type: string;
  payload: any;
}

@Injectable({ providedIn: 'root' })
export class SignalrService {
  private connection: signalR.HubConnection | null = null;
  private eventSubject = new Subject<HubEvent>();
  events$ = this.eventSubject.asObservable();
  isConnected = false;

  async connect(): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this.connection.on('TaskAssigned', payload => this.eventSubject.next({ type: 'TaskAssigned', payload }));
    this.connection.on('TaskUpdated', payload => this.eventSubject.next({ type: 'TaskUpdated', payload }));
    this.connection.on('DeadlineAlert', payload => this.eventSubject.next({ type: 'DeadlineAlert', payload }));
    this.connection.on('WorkloadRebalanced', payload => this.eventSubject.next({ type: 'WorkloadRebalanced', payload }));

    this.connection.onreconnected(() => { this.isConnected = true; });
    this.connection.onclose(() => { this.isConnected = false; });

    try {
      await this.connection.start();
      this.isConnected = true;
    } catch (err) {
      console.warn('SignalR connection failed (backend may not be running):', err);
    }
  }

  async joinProject(projectId: string): Promise<void> {
    if (this.connection && this.isConnected)
      await this.connection.invoke('JoinProject', projectId);
  }

  async disconnect(): Promise<void> {
    await this.connection?.stop();
    this.isConnected = false;
  }
}
