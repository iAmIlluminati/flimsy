<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<xsl:param name="sortParam" select="id"></xsl:param>
<xsl:param name="order" select="descending"></xsl:param>
<xsl:param name="filter"></xsl:param>
<xsl:param name="filterOn"></xsl:param>
<!-- Parameters Used for sorting-->

<xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
<!-- Variable to perform case conversion -->


<xsl:template match="/">
        <xsl:for-each select="movielist/movie[contains(translate(*[name()=$filterOn],$uppercase,$lowercase), $filter)]">
              <xsl:sort select='*[name()=$sortParam]' order="{$order}"/>
              <div class="card">
                <img src='{posterUrl/@src}' alt="{title}"/>
                <div class="card-body">
                <div class="rowOne">
                <h5 class="card-title">
                      <xsl:value-of select="title"/>
                      <!-- <xsl:value-of select="$filterOn"/> -->
                      <!-- <xsl:value-of select="$filter"/> -->
                      <h5 class="card-year">
                        <xsl:value-of select="year"/>
                      </h5>
                </h5>
                </div>
                  <h5 class="card-director"><xsl:value-of select="director"/></h5>
                  <p class="card-plot"><xsl:value-of select="substring(plot, 1, 87)"/> ...</p>
                </div>
              </div>
        </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
