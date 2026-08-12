import { NextRequest, NextResponse } from 'next/server';
import { verifyUserOwnership, getEbookById } from '@/lib/data/repository';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ebookId = params.id;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!ebookId) {
      return NextResponse.json({ error: 'eBook ID missing' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: User authentication required.' }, { status: 401 });
    }

    // 1. Check if eBook exists
    const ebook = await getEbookById(ebookId);
    if (!ebook) {
      return NextResponse.json({ error: 'eBook not found' }, { status: 404 });
    }

    // 2. Server-side ownership verification
    const isOwner = await verifyUserOwnership(userId, ebookId);
    if (!isOwner) {
      return NextResponse.json(
        { error: 'Forbidden: You must purchase this eBook before downloading.' },
        { status: 403 }
      );
    }

    // 3. Generate secure downloadable sample content or stream private asset
    const pdfTextContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 120 >>
stream
BT
/F1 24 Tf
100 700 Td
(${ebook.title}) Tj
0 -40 Td
/F1 14 Tf
(Licensed exclusively to: ${userId}) Tj
0 -30 Td
(Author: ${ebook.author}) Tj
0 -30 Td
(Thank you for purchasing from Lumina Books.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000246 00000 n 
0000000418 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
490
%%EOF`;

    const fileName = `${ebook.slug}-lumina-books.pdf`;

    return new NextResponse(pdfTextContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Download failed' },
      { status: 500 }
    );
  }
}
