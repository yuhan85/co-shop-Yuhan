import AWS from 'aws-sdk';
import crypto from 'crypto';

class CognitoService {
  private config = {
    region: 'us-east-2',
  };
  private secretHash: string =
    'vgs79h16a3csu1jbi6vqclmgpaddscsgouitso103rmjrce1q2l'; //AWS中App client information的Client ID
  private clientId: string = '2hjup7miiiafpafc85te9vvl4r';

  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  public async signUpUser(
    username: string,
    password: string,
    userAttr: Array<any>
  ): Promise<string | null> {
    const prams = {
      ClientId: this.clientId,
      Password: password,
      Username: username,
      SecretHash: this.generateHash(username),
      UserAttributes: userAttr,
    };
    try {
      const data = await this.cognitoIdentity.signUp(prams).promise();
      console.log(data);
      return data.UserSub;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  public async verifyAccount(username: string, code: string): Promise<boolean> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      SecretHash: this.generateHash(username),
      Username: username,
    };
    try {
      const data = await this.cognitoIdentity.confirmSignUp(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async signInUser(
    username: string,
    password: string
  ): Promise<boolean> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.generateHash(username),
      },
    };
    try {
      const data = await this.cognitoIdentity.initiateAuth(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private generateHash(username: string): string {
    return (
      crypto
        //创建了一个 HMAC（Hash-based Message Authentication Code）对象，使用 SHA256 算法和 this.secretHash 作为密钥。
        .createHmac('SHA256', this.secretHash)
        // 将 username 和 this.clientId 连接起来，作为数据更新到 HMAC 对象中。
        .update(username + this.clientId)
        //计算 HMAC 的摘要，并将其转换为 base64 编码的字符串，作为函数的返回值。
        .digest('base64')
    );
  }
}

export default CognitoService;
