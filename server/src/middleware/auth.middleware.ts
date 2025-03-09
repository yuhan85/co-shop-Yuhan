import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//jsonwebtoken 模块是 Node.js 中用于生成、验证和解码 JSON Web Tokens (JWT) 的一个流行库。JWT 是一种开放标准（RFC 7519），常用于在不同的服务之间传递安全可靠的信息，比如用户身份验证。
//生成 JWT: 使用 jwt.sign() 方法可以生成一个新的 JWT，其中包含了你需要传递的数据（例如用户的 ID、角色等）。
//验证 JWT: 使用 jwt.verify() 方法可以验证一个 JWT 的有效性，并从中提取出其中的数据。
//解码 JWT: 使用 jwt.decode() 方法可以解码一个 JWT，但不会验证其有效性。
import jwkToPem from 'jwk-to-pem';
//jwk-to-pem 模块用于将 JSON Web Key (JWK) 转换为 PEM 格式。JWK 是一个 JSON 对象，用于表示公钥或私钥，而 PEM 是一种常见的密钥格式。
//密钥转换: 当你从一个服务端获取到一个 JWK 时，可以使用这个模块将其转换为 PEM 格式，以便在 Node.js 的加密模块中使用。
import fetch from 'node-fetch';
//node-fetch 模块是一个轻量级的 Node.js 版本的 Fetch API，用于发起 HTTP 请求。Fetch API 是一个现代的 JavaScript API，用于获取资源。
//发起 HTTP 请求: 可以使用 fetch() 方法向指定 URL 发送请求，获取响应数据。支持各种 HTTP 方法: GET、POST、PUT、DELETE 等。

let pems: { [key: string]: string } = {};
// 初始化一个空对象，用于存储从 AWS Cognito 获取的 PEM 格式密钥。

class AuthMiddleware {
  // 定义一个认证中间件类。

  private poolRegion: string = 'us-east-2';
  private userPoolId: string = 'us-east-2_h85cKaXGO';
  // 定义 AWS Cognito 用户池的区域和 ID。

  constructor() {
    this.setUp();
  }
  // 构造函数，在实例化类时调用 setUp 方法来获取并设置 JWK。

  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    // 验证 JWT 的方法，它会在 Express 中间件链中被调用。

    const token = req.header('Auth');
    // 从请求头中获取 JWT。

    console.log(token);
    // 打印获取到的 JWT，用于调试。

    if (!token) {
      res.status(401).end();
      return;
    }
    // 如果没有获取到 JWT，返回 401 未授权状态码并结束响应。

    let decodeJwt: any = token ? jwt.decode(token, { complete: true }) : null;
    // 解码 JWT，获取其内容和头部信息。

    if (!decodeJwt) {
      res.status(401).end();
      return;
    }
    // 如果解码失败，返回 401 状态码并结束响应。

    let kid = decodeJwt.header.kid;
    // 从解码后的 JWT 中提取 kid (key ID)，用于找到对应的 PEM 密钥。

    let pem = pems[kid];
    // 从预先存储的 PEM 密钥中查找对应的 PEM。

    if (!pem) {
      res.status(401).end();
      return;
    }
    // 如果找不到对应的 PEM 密钥，返回 401 状态码并结束响应。

    jwt.verify(
      token as string,
      pem,
      { complete: true },
      (err: jwt.VerifyErrors | null, decoded: jwt.Jwt | undefined) => {
        if (err) {
          res.status(401).end();
        } else {
          next();
        }
      }
    );
    // 验证 JWT 是否有效。如果无效，返回 401 状态码；如果有效，调用 next 继续处理请求。
  }

  private async setUp() {
    // 异步方法，用于从 AWS Cognito 获取 JWK 并转换为 PEM 格式。

    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
    // 定义获取 JWK 的 URL，其中包含了 Cognito 用户池的区域和 ID。

    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw 'request not successful';
      }
      // 发起 HTTP 请求获取 JWK，如果请求不成功则抛出错误。

      const data = (await response.json()) as {
        keys: { kid: string; n: string; e: string; kty: string }[];
      };
      const { keys } = data;
      // 获取 JWK 的 keys 部分。

      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        // 提取每个密钥的关键属性。

        const jwk: { kty: 'RSA'; n: string; e: string } = {
          kty: 'RSA',
          n: modulus,
          e: exponent,
        };
        // 生成一个 JWK 对象。

        const pem = jwkToPem(jwk);
        // 将 JWK 转换为 PEM 格式。

        pems[key_id] = pem;
        // 将转换后的 PEM 存储到 pems 对象中，使用 key_id 作为键。
      }

      console.log('got all pems');
      // 成功获取并转换所有 PEM 后，输出日志信息。
    } catch (error) {
      console.log(error);
      console.log('sorry could not fetch jwks');
      // 捕获错误并输出错误信息。
    }
  }
}

export default AuthMiddleware;
