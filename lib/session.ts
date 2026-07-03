import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET;


type SessionPayload = {
  userId: string;
  exp: number;
};

function sign(data: string) {
  if (!SECRET) {
    throw new Error("SESSION_SECRET is not defined");
  }
  return crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("hex");
}

export function createSession(userId: string) {
  const payload: SessionPayload = {
    userId,
    exp: Date.now() + 1000 * 60 * 60 * 24, // 24h
  };

  const data = JSON.stringify(payload);

  const signature = sign(data);

  return Buffer.from(
    JSON.stringify({
      payload,
      signature,
    })
  ).toString("base64url");
}

export function verifySession(session: string) {
  try {
    const decoded = JSON.parse(
      Buffer.from(session, "base64url").toString()
    );

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.payload ||
      typeof decoded.payload.userId !== "string" ||
      typeof decoded.payload.exp !== "number" ||
      typeof decoded.signature !== "string"
    ) {
      return null;
    }

    const payloadString = JSON.stringify(decoded.payload);

    const expectedSignature = sign(payloadString);

    const valid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(decoded.signature)
    );

    if (!valid) {
      return null;
    }

    if (decoded.payload.exp < Date.now()) {
      return null;
    }

    return decoded.payload as SessionPayload;
  } catch {
    return null;
  }
}