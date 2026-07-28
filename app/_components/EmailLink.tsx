"use client";
export function EmailLink() { const user = "danielinaciocruz1"; const host = "gmail.com"; return <a className="button primary" href={`mailto:${user}@${host}`}>Écrire à Daniel</a>; }
