import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ 이 부분을 추가하세요.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        // 해당 버킷의 모든 이미지를 허용하려면 '/**'
        // 특정 경로만 허용하려면 '/globalnomad/**' 처럼 지정할 수 있습니다.
        pathname: '/globalnomad/**',
      },
    ],
  },
};

export default nextConfig;
