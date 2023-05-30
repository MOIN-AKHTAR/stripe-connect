const {stripeClient}=require("../config/stripe.config")

exports.getAccountUrl=async(req,res)=>{
    try {

        const account = await stripeClient.accounts.create({
            type: 'standard',
          });
        
        const {url} = await stripeClient.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.ORIGIN}/?account_id=${account.id}`,
            return_url: `${process.env.ORIGIN}/?account_id=${account.id}`,
            type: 'account_onboarding',
          });
    
          
        return res.status(201).json({
            success:true,
            url
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            error
        })
    }
}


exports.verifyAccount = async (req,res) => {
    try {
      const account = await stripeClient.accounts.retrieve(req.query.accountId);
      if (!account) {
        return res.status(404).json({
            success:false,
            error:"No account found"
        })
      }
      if (!account.details_submitted) {
        return res.status(400).json({
            success:false,
            error:"User havn't provided all requird information"
        })
      }
      return res.status(200).json({
        success:true
      })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            error
        })
    }
  };