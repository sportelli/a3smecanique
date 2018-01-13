import * as AWS from 'aws-sdk';

class EmailSender {
    public send(data, config) {
        const ses = new AWS.SES(
            {
                accessKeyId: config.aws_ses_access_key,
                secretAccessKey: config.aws_ses_private_key,
                region: config.aws_region
            });

        const params = {
            Destination: {
                ToAddresses: [config.recipientContactEmail]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: data.content
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'Nouvel email depuis ' + config.url
                }
            },
            Source: config.recipientContactEmail
        };

        ses.sendEmail(params, (err, awsData) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log(awsData);
            }
        });
    }
}

export {EmailSender};
