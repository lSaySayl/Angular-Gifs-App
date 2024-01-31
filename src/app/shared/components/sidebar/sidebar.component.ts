import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public _tagHistory: string[] = []

  constructor (private _gifsService: GifsService) {
  }

  get tags() {
    return this._gifsService.tagsHistory;
  }

  public searchTag(tag: string) {
    this._gifsService.searchTag(tag);
  }

}
