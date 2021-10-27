import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import ical from 'node-ical';
import ical2json from 'ical2json';

class SSOWebView extends Component {
    async function parseICal(event) {

        const data = await ical.async.fromURL(event.nativeEvent.data);
                const iCalJSON = ical2json.convert(data);
                
                try {
                    const response = fetch('https://uqpool.xyz:7777/timetable', {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: iCalJSON
                    });

                    const json = await response.json();

                    if (json.msg =="timetable added") {      
                        console.log("go back to the home screen");
                    } else {
                        console.log("failed to add time table");
                    }

                } catch (error) {
                    console.log(error);
            }
        
    }
    
  render() {
    return 
      <WebView 
              ref={ref => (this.webview = ref)}
      source={{ uri: 'http://uq-pool.uqcloud.net/test.php' }}
      
      onNavigationStateChange= {
          this.handleWebViewNavigationStateChange
      }
      
              onMessage={event => {
                  parseICal(event);
              });
              }}
      />;
  }
}

  handleWebViewNavigationStateChange = newNavState => {

    const { url } = newNavState;
    if (!url) return;

// handle sid+password uq authenticate page
    if (url.includes('timetable.my.uq.edu.au/odd/') && !url.includes('student?ss=')) {
        }    
        
        
        // Handle information sharing confirmation page
        if (url.includes('timetable.my.uq.edu.au/odd/') && !url.includes('student?ss=')) {
            }    
        
    // Handle time table student module selection
    if (url.includes('timetable.my.uq.edu.au/odd/') && !url.includes('student?ss=')) {
        const goToLink = "document.querySelectorAll(\'a[href*=\"student\"]\')";
        ;
              this.webview.injectJavaScript(goToLink);
    }

    // Handle time table arrival on screen
    if (url.includes('student?ss=')) {
        const run = "window.ReactNativeWebView.postMessage(iCalURL)";
        setTimeout(() => {
          this.webref.injectJavaScript(run);
        }, 1000);       
    }

}