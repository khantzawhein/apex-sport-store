class RouteServiceProvider {
  constructor(router) {
    this.router = router;
  }

  register() {
    // Register routes
    this.router.get('/', 'HomeController@index');
  }
}