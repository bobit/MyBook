---
abbrlink: '0'
---

### 描述
maven-dependency-plugin (goals "copy-dependencies","unpack") is not supported by m2e 

### 解决
增加
<pluginManagement>  
            <plugins>  
                <plugin>  
                    <groupId>org.eclipse.m2e</groupId>  
                    <artifactId>lifecycle-mapping</artifactId>  
                    <version>1.0.0</version>  
                    <configuration>  
                        <lifecycleMappingMetadata>  
                            <pluginExecutions>  
                                <pluginExecution>  
                                    <pluginExecutionFilter>  
                                        <groupId>org.apache.maven.plugins</groupId>  
                                        <artifactId>maven-dependency-plugin</artifactId>  
                                        <versionRange>[2.0,)</versionRange>  
                                        <goals>  
                                            <goal>copy-dependencies</goal>  
                                        </goals>  
                                    </pluginExecutionFilter>  
                                    <action>  
                                        <ignore />  
                                    </action>  
                                </pluginExecution>  
                            </pluginExecutions>  
                        </lifecycleMappingMetadata>  
                    </configuration>  
                </plugin>  
            </plugins>  
        </pluginManagement>
		
或
install 然后clean
target 目录下生产目录即可。

或
E:\Workspaces\STS\.metadata\.plugins\org.eclipse.m2e.core.ui/lifecycle-mapping-metadata.xml
