<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <!-- <html>
      <body>
        <h2>My CD Collection</h2> -->
        <xsl:for-each select="movielist/movie">
          <!-- <table border="1"> -->
            <p>
              <xsl:value-of select="id"/>
            </p>
            <p>
              <xsl:value-of select="title"/>
            </p>
            <p>
              <xsl:value-of select="year"/>
            </p>
            <p>
              <xsl:value-of select="runtime"/>
            </p>
            <xsl:for-each select="genrelist">
              <p>
                <xsl:value-of select="genre"/>
              </p>
            </xsl:for-each>
            <p>
              <xsl:value-of select="director"/>
            </p>
            <p>
              <xsl:value-of select="actors"/>
            </p>
            <p>
              <xsl:value-of select="plot"/>
            </p>
            <p>
              <xsl:value-of select="posterUrl"/>
            </p>
          <!-- </table> -->
        </xsl:for-each>
      <!-- </body>
    </html> -->
  </xsl:template>
</xsl:stylesheet>