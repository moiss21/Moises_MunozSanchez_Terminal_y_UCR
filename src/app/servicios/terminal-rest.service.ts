import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TerminalRestService {

  constructor(private http: HttpClient)
  {

  }

  getTerminal(): any {
    return this.http.get("http://tapsd.local:3000/terminal");
  }
}
