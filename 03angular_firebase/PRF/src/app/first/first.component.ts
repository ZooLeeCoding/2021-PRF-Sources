import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs';

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

  cloudElements: any[];

  example = ['1_elem'];

  cloudId = '';
  value = '';

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
    this.afs.collection('Examples').add({id: this.cloudId, value: this.value}).then(() => {
      console.log('mentes sikeres');
      this.cloudId = '';
      this.value = '';
    }).catch(error => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    this.dataObserver = this.afs.collection('Examples').get().subscribe(res => {
      this.cloudElements = [];
      res.forEach(el => {
        const data: any = el.data();
        this.cloudElements.push('Id: ' + data.id + ', Value: ' + data.value);
      })
    })
  }

}
