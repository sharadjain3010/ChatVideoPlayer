import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { VideoPlayerService } from './video-player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private service: VideoPlayerService) { }

  title = 'chatVideoPlayer';
  interval;
  scrollVal = 0;
  clientHeight
  scrollHeight
  rangeVal = 0;
  fileName: string;
  resData: Array<any> = [];
  @ViewChild('range', { static: false }) range;


  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.fileName = res.fileName;
    });
    this.service.getFileData(this.fileName).subscribe((res) => {
      this.resData = res;
      setTimeout(()=>{
        this.clientHeight = document.querySelector('#content').clientHeight
        this.scrollHeight = document.querySelector('#content').scrollHeight;
        this.scroll(this.scrollVal);
      }, 0);
    });
  }

  play() {
    this.interval = setInterval(() => {
      this.scrollVal = Number(this.scrollVal) + 1;
      if (Number(this.scrollVal) > 100) {
        this.pause();
        this.scrollVal = 0;
      } else {
        this.scroll(this.scrollVal);
      }
    }, 100);
  }

  pause(): void {
    clearInterval(this.interval);
  }

  stop(): void {
    this.scrollVal = 0;
    this.rangeVal = 0;
    this.scroll(this.scrollVal);
    clearInterval(this.interval);
  }

  scroll(scrollVal): void {
    this.rangeVal = scrollVal;
    let windowToScroll = ((this.scrollHeight - this.clientHeight) * scrollVal) / 100;
    document.querySelector('#content').scrollTo(0, windowToScroll);
  }

  rangeSlider(val) {
    this.scrollVal = val;
    let windowToScroll = ((this.scrollHeight - this.clientHeight) * val) / 100;
    document.querySelector('#content').scrollTo(0, windowToScroll);
  }

  trackByFn(item, index) {
    return index;
  }

}
