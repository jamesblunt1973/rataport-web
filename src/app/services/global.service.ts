import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  public LANGUAGE = 3;
   public BASE_API_URL = 'https://admin.rataport.com:444/api/';
   //public BASE_API_URL = 'http://localhost:11480/api/';
  // public BASE_API_URL = 'http://rata.terend.com/api/';
  public BASE_IMAGE_API_URL = 'https://admin.rataport.com:444/assets/images/';
  // public BASE_IMAGE_API_URL = 'http://localhost:11480/assets/images/';
  // public BASE_IMAGE_API_URL = 'http://rata.terend.com/assets/images/';
  public HEADER_GROUP_ID = 2;
  public FOOTER_GROUP_ID = 3;
  public SITEMAP_GROUP_ID = 4;

  constructor() { }

}
