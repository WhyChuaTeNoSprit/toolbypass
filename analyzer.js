/* URL parsing helpers. This file does not fetch URLs or bypass website controls. */
(function (global) {
  "use strict";

  function analyzeUrl(raw) {
    const value = String(raw || "").trim();
    if (!value) throw new Error("Vui lòng nhập URL.");

    let parsed;
    try {
      parsed = new URL(value);
    } catch (_) {
      throw new Error("URL không hợp lệ. Hãy nhập địa chỉ đầy đủ, ví dụ https://example.com/");
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Chỉ hỗ trợ URL bắt đầu bằng http:// hoặc https://.");
    }

    const warnings = [];
    if (parsed.protocol !== "https:") {
      warnings.push("Địa chỉ không dùng HTTPS; thông tin truyền đi có thể không được mã hóa.");
    }
    if (parsed.username || parsed.password) {
      warnings.push("URL có chứa trường username/password. Không chia sẻ liên kết này công khai.");
    }
    if (parsed.hostname.split(".").some(part => part.toLowerCase().startsWith("xn--"))) {
      warnings.push("Tên miền có ký tự quốc tế được mã hóa (IDN). Hãy kiểm tra kỹ để tránh tên miền giả mạo.");
    }
    if (parsed.hostname === "localhost" || parsed.hostname.endsWith(".local")) {
      warnings.push("Địa chỉ có vẻ trỏ tới máy cục bộ hoặc mạng riêng; không nên mở nếu bạn không chủ động cấu hình.");
    }
    if (parsed.search) {
      warnings.push("URL có tham số truy vấn. Tránh chia sẻ công khai nếu chúng chứa mã phiên hoặc thông tin cá nhân.");
    }
    if (!warnings.length) {
      warnings.push("Không phát hiện các dấu hiệu cơ bản đã kiểm tra. Điều này không chứng minh website an toàn.");
    }

    return {
      hostname: parsed.hostname,
      protocol: parsed.protocol,
      pathname: parsed.pathname || "/",
      search: parsed.search || "(không có)",
      normalized: parsed.href,
      warnings: warnings
    };
  }

  function parseChain(raw) {
    return String(raw || "").split(/\r?\n/).map(s => s.trim()).filter(Boolean).map((value, index) => {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          return { index: index + 1, value, valid: false, error: "Giao thức không được hỗ trợ." };
        }
        return { index: index + 1, value: url.href, valid: true, host: url.hostname };
      } catch (_) {
        return { index: index + 1, value, valid: false, error: "URL không hợp lệ." };
      }
    });
  }

  global.LinkAnalyzer = { analyzeUrl, parseChain };
})(window);
