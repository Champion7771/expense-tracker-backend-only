const mongoose = require("mongoose");

const maskUri = (uri) => {
  try {
    return uri.replace(/(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@/, '$1$2:****@');
  } catch (e) {
    return uri;
  }
};

const dns = require('dns');

const ensureSrvResolvable = async (srvDomain) => {
  try {
    await dns.promises.resolveSrv(srvDomain);
    return;
  } catch (err) {
    // If our system resolver refuses, try public DNS servers as a fallback
    if (err && err.code === 'ECONNREFUSED') {
      const fallback = process.env.DNS_SERVERS ? process.env.DNS_SERVERS.split(',') : ['1.1.1.1', '8.8.8.8'];
      console.warn(`SRV lookup refused. Setting DNS servers to: ${fallback.join(', ')}`);
      dns.setServers(fallback);
      // retry once
      await dns.promises.resolveSrv(srvDomain);
      return;
    }
    throw err;
  }
};

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    console.log("Attempting MongoDB connection to:", maskUri(uri));

    // If using mongodb+srv, ensure Node can resolve SRV records; fall back to public DNS servers on ECONNREFUSED
    if (uri && uri.toLowerCase().startsWith('mongodb+srv://')) {
      const m = uri.match(/^mongodb(?:\+srv)?:\/\/(?:[^@]+@)?([^\/,:]+)/i);
      if (m && m[1]) {
        const srvDomain = `_mongodb._tcp.${m[1]}`;
        try {
          await ensureSrvResolvable(srvDomain);
        } catch (e) {
          console.warn('SRV resolution failed even after DNS fallback:', e.message);
          // continue to attempt connection; it will likely fail but we provide a clear log
        }
      }
    }

    // Connect without deprecated/removed options; let mongoose & the driver handle defaults
    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  }
};

module.exports = connectDB;