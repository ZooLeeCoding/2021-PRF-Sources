import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router, private afs: AngularFirestore) {
    console.log(environment);
    this.cloudElements = [];
  }

  title = 'PRF';

  cloudId = '';
  value = '';
  cloudElements: any[];

  example = ['1_elem'];

  dataObserver: Subscription | null = null;

  goToSecond() {
    this.router.navigate(['/second', 'PRF', {message: this.title}]);
  }

  hello() {
    console.log('Hello World!');
    if(this.title === 'PRF') {
      this.title = 'NOT PRF';
    } else {
      this.title = 'PRF';
    }
    this.example.push(Math.floor(Math.random()*100) + '_elem');
    /* this.connectionService.greet().subscribe(data => {
      console.log('This came from the server: ', data);
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    }); */
  }

  helloFrom(st: string) {
    console.log('Hello from ' + st);
  }

  saveData() {
    this.afs.collection('Examples-023').add({id: this.cloudId, value: this.value}).then(res => {
      console.log('save successful', res);
      this.cloudId = '';
      this.value = '';
      this.refreshDb();
    }).catch(error => {
      console.log('save error', error);
    })
  }

  refreshDb() {
    this.cloudElements = [];
    this.afs.collection('Examples-023', ref => ref.where('id', '==', 'valami').orderBy('value', 'desc')).get().subscribe(res => {
      res.docs.forEach(doc => {
        const data = doc.data() as any;
        this.cloudElements.push('Id: ' + data.id + ', Value: ' + data.value);
      })
    })
  }

  ngOnInit(): void {
    this.refreshDb();
  }

}
