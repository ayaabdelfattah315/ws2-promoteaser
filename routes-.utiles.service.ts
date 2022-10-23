  /**
     * it accepts a url then check if it was internal or external one
     * if the url wasn't internal nor external included in the whitelist, it will navigate to the default dashboard
     * @param url the url to be navigated to
     */
    public navigateToURL (url, replaceUrl?: boolean, targetUrl?: string, queryStrings?: object) {
        const matches = url.match(regex.dynamicDataRegex);
        if (matches) {
            matches.forEach(element => {
                const key = element.replace(regex.curlyBraces, '');
                url = url.replace(`{${key}}`, this.urlDyanmicData[key]);

            });
        }
        url = decodeURIComponent(url);
        const targetURL = targetUrl ? targetUrl : TARGET_URL.SAME_TAB;
        const redirectTo = url.split('#')[0].split('?')[0];
        if (this.checkInternalLinks(redirectTo)) {
            const showDataLoseNotification = this.detectDataLossService.detectDataLossStatus;
            let stopNavigation: boolean = false;
            if (queryStrings) {
              url = this.router.createUrlTree([url], {
                  queryParams: queryStrings,
              });
          }

            if (showDataLoseNotification === DataLossStatus.Change_Detected) {
                stopNavigation = !confirm(ON_LEAVE_MESSAGE);
            }
            if (!stopNavigation) {
                this.detectDataLossService.removeEventListener();
                if (replaceUrl) {
                    this.router.navigateByUrl(url, { replaceUrl: true });
                } else {
                    this.router.navigateByUrl(url);
                }
            }
        } else if (this.checkExternalLinks(this.applyDomainToUrl(url)) || url.match(regex.telLink)) {
            window.open(url, targetURL, 'noopener, noreferrer');
        } else {
            window.open(window.location.origin + API_URLS.ECARE_ROUTES.DASHBOARD, targetURL, 'noopener,noreferrer');
        }
    }
/**
     * returns true if the targetUrl is an internal link and false otherwise
     * @param targetURL contains the Target url
     * @return boolean
     */
    /** checkInternalLinks */
    public checkInternalLinks (targetURL: string): boolean {
        return this.getRouteUsingURL(targetURL) !== null;
    }
  /**
     * search for route by route's url and return the full route object
     * @param url - route url
     * @param moduleName - determine which module will be searched in
     */
    /** getRouteUsingURL */
    public getRouteUsingURL (url: string): Route {
      const currentActor = this.commonCacheService.getCurrentUserModel() ? this.commonCacheService.getCurrentUserModel().getActor() : '';
      const isCableOrUte = currentActor == ACTORS.ute || currentActor == ACTORS.martin;
      const navigationKeys = ['access', 'titleKey', 'processKey', 'pageType', 'navigation', 'notifyBeforeUnload', 'data', 'disableEdit', 'fallbackDeeplinking'];
        url = url.split('?')[0].split('#')[0];
        let route: Route = null;
        let queryRoute = null;
        const conf = this.configService.loadPagesRoutes();
        Object.keys(conf).forEach(moduleKey => {
            if (conf[moduleKey].route === url) {
                route = conf[moduleKey];
            }
             else {
                Object.keys(conf[moduleKey]).forEach(stepKey => {
                    if (conf[moduleKey][stepKey].route === url) {
                        route = conf[moduleKey][stepKey];
                        const tempRoute = pick(conf[moduleKey], navigationKeys);
                        route = extend({}, tempRoute, route);
                    } else {
                      Object.keys(conf[moduleKey][stepKey]).forEach(secondstepKey => {
                        if (conf[moduleKey][stepKey][secondstepKey] && conf[moduleKey][stepKey][secondstepKey].route === url) {
                          route = conf[moduleKey][stepKey][secondstepKey];
                          const tempRoute = pick(conf[moduleKey][secondstepKey], navigationKeys);
                          route = extend({}, tempRoute, route);
                    }
                  });
                }
                });
            }
        });
        const queryStringdata = this.getParamsFromUrl();
        // getting query string value
        queryStringdata && Object.keys(queryStringdata).forEach((key) => {
          queryRoute = key !== 'accordion' ? this.getRouteUsingQueryStr(queryStringdata[key]) : null;
        });

        route = route && queryRoute && queryRoute.queryNavigation ? queryRoute : route;

        // get active step configuration
        if (route && route.stepper && this.historyUrl.currentStep !== -1) {
            if (typeof this.historyUrl.currentStep === 'string') {
                const stepByName = route.stepper.filter((step) => {
                    if (this.historyUrl['currentStep'].toString() == step['name']) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                route = extend({}, route, stepByName.length ? stepByName[0] : {});
            }
            else {
                route = extend({}, route, route.stepper[this.historyUrl.currentStep]);
            }
        }

        if (isCableOrUte && route && route.cable) {
          route = extend({}, route, route.cable);
        }

        return route;
    }