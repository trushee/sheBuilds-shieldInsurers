let account;

      document.getElementById('connect-button').addEventListener('click', event => { 
        let button = event.target;
        ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
          account = accounts[0];
          console.log(account);
          button.textContent = account;

          ethereum.request({method: 'eth_getBalance' , params: [account, 'latest']}).then(result => {
            console.log(result);
            let wei = parseInt(result,16);
            let balance = wei / (10**18);
            console.log(balance + " ETH");
          });
        });
      });

        window.addEventListener('load', async () => {
            if (window.ethereum) {
              window.web3 = new Web3(ethereum);
              try {
                await ethereum.enable();
                initPayButton()
              } catch (err) {
                $('#status').html('User denied account access', err)
              }
            } else if (window.web3) {
              window.web3 = new Web3(web3.currentProvider)
              initPayButton()
            } else {
              $('#status').html('No Metamask (or other Web3 Provider) installed')
            }
          })
      
          const initPayButton = () => {
            $('.pay-button').click(() => {
              // paymentAddress is where funds will be send to
              const paymentAddress = '0x0b9b0ef139496fcace4d3b64d8b15e305f012933'
              const amountEth = 0.001
      
              web3.eth.sendTransaction({
                to: paymentAddress,
                value: web3.toWei(amountEth, 'ether')
              }, (err, transactionId) => {
                if  (err) {
                    redirect();
                    alert("payment is successful")
                    var clickedBtn=alert("payment");
                    console.log(clickedBtn);
                        var delay = 10000;
  //pressed ok. Redirect to url
                            window.location.href = "nft.html";
                                
                //     var delay = 5000;
                //     setTimeout(function () {
                //             window.location.href = "index.html";
                //             }, delay); 
                // alert("You will be redirected to Home Page after 5 seconds");
                //     window.location.replace('index.html');
                  console.log('Payment failed', err)
                  $('#status').html('Payment failed')
                } else {
                  console.log('Payment successful', transactionId)
                  $('#status').html('Payment successful')
                }
              })
            })
          }

          function redirect () {
            alert("payment successful");
            setTimeout("myURL", 5000);
            // var result = document.getElementById("result");
            // result.innerHTML = "<b> The page will redirect after delay of 5 seconds";
         }

         function myURL() {
            document.location.href = 'nft.html';
         }