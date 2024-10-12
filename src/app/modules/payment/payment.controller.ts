import { Request, Response } from "express"
import { paymentServices } from "./payment.service"
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const initiatePayment = catchAsync(async (req, res) => {
  const responseData = await paymentServices.initiatePaymentData(req.body);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment link created successfully',
      data: responseData,
  });
});

const confirmationController = async (req: Request, res: Response) => {
    const result = await paymentServices.confirmationService(req?.query?.email as string)
    if(result){
        res.send(`
         <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to top, #d9afd9 0%, #884D80 100%);
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px 40px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            text-align: center;
        }

        h1 {
            margin-bottom: 20px;
            font-size: 2rem;
        }

        p {
            font-size: 1.2rem;
            margin: 10px 0;
        }

        .highlight {
            font-weight: bold;
            color: #fde047;
        }

        .profile-picture {
            border-radius: 50%;
            width: 100px;
            height: 100px;
            object-fit: cover;
            margin-bottom: 20px;
            border: 2px solid #fff;
        }

        .return-home {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #1d4ed8;
            color: #fff;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
        }

        .return-home:hover {
            background-color: #3b82f6;
        }
    </style>
</head>

<body>
    <div class="container">
        <img src="${result?.profilePicture}" alt="Profile Picture" class="profile-picture" />
        <h1>Subscription Success</h1>
        <p><span class="highlight">Member Status:</span> ${result?.memberStatus?.status}</p>
        <p><span class="highlight">Expires In:</span> ${result?.memberStatus?.expiresIn ? new Date(result.memberStatus.expiresIn).toLocaleDateString() : 'N/A'}
</p>
        <p><span class="highlight">Name:</span> ${result?.name}</p>
        <p><span class="highlight">Email:</span> ${result?.email}</p>
        <a href="http://localhost:3000/login" class="return-home">Please login again for access premium content</a>
    </div>
</body>

</html>

        `)
    }
    
}

export const paymentController = {
    initiatePayment,
    confirmationController
}


