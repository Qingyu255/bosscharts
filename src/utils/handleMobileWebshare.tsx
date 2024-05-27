const handleMobileWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SMU BOSS Charts',
          text: 'Check out SMU BOSS Charts! Visualise Bid Price History and Analyse Detailed Bid Price Trends For Any Course with bid price charts.',
          url: 'https://www.smubosscharts.com',
        })
      } catch (error) {
        console.error('Error sharing site:', error)
      }
    } else {
      alert('Error: Web Share API is not supported in non-mobile browser.');
    }
}
export default handleMobileWebShare