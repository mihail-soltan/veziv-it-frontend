import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from '../interfaces/work';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://veziv-it-challenge-backend-production.up.railway.app';

  // Get all works or only visible works if visible is true
  getWorks(visible: boolean = false): Observable<any> {
    return this.http.get(`${this.apiUrl}/works${visible ? '/visible' : ''}`);
  }

  // Add a work
  addWork(work: Work, file: File ): Observable<any> {
    const formData = new FormData();
    formData.append('title', work.title);
    formData.append('description', work.description);
    formData.append('visible', "true");
    formData.append('customerWebsite', work.customerWebsite);
    formData.append('image', file);
    // formData.append('Key', file.name)
    return this.http.post(`${this.apiUrl}/works`, formData);
  }

  // Toggle visibility of a work
  toggleVisibility(work: Work): Observable<any> {
    const body ={
      visible: !work.visible
    }
    return this.http.put(`${this.apiUrl}/works/${work._id}`, body);
  }

  // update a work
  updateWork(work: Work): Observable<any> {
    const body = {
      title: work.title,
      description: work.description,
      customerWebsite: work.customerWebsite,
    }
    return this.http.put(`${this.apiUrl}/works/${work._id}`, body);
  }

  // delete a work

  deleteWork(work: Work): Observable<any> {
    return this.http.delete(`${this.apiUrl}/works/${work._id}`);
  }
}
