import React from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';

const StockScreen = () => {
  // Script to load the TradingView Widget asynchronously
  const script = `
    (function() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.siteLogo}>Saraf Tarsewala Jewellers</Text>
      </View>
      <View style={styles.tickerTape}>
        <WebView
          source={{ html: '<div class="tradingview-widget-container"><div class="tradingview-widget-container__widget"></div></div>' }}
          style={{ width: '100%', height: 300 }}
          injectedJavaScript={script}
          javaScriptEnabled={true}
        />
      </View>
      {/* Add other components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 16,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  siteLogo: {
    fontWeight: '600',
    fontSize: 24,
    padding: 16,
    backgroundColor: 'linear-gradient(90deg, #00bce5 0%, #2962ff 100%)',
    color: 'transparent', // Color will be transparent, text will be colored as per background
    WebkitBackgroundClip: 'text', // For web compatibility
    backgroundClip: 'text',
  },
  tickerTape: {
    width: '100%',
    marginBottom: 32,
    padding: 16,
  },
  // Add other styles as needed
});

export default StockScreen;
