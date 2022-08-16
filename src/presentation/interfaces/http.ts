export type HttpResponse = {
  statusCode: number;
  body?: any;
};

export type HttpRequest = {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  url?: any;
};
