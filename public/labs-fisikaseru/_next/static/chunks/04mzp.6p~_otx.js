(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32505,(e,t,n)=>{"use strict";var r=e.r(51361),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=r.useState,a=r.useEffect,o=r.useLayoutEffect,l=r.useDebugValue;function u(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!i(e,n)}catch(e){return!0}}var c="u"<typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=s({inst:{value:n,getSnapshot:t}}),i=r[0].inst,c=r[1];return o(function(){i.value=n,i.getSnapshot=t,u(i)&&c({inst:i})},[e,n,t]),a(function(){return u(i)&&c({inst:i}),e(function(){u(i)&&c({inst:i})})},[e]),l(n),n};n.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:c},83485,(e,t,n)=>{"use strict";t.exports=e.r(32505)},49816,(e,t,n)=>{"use strict";var r=e.r(51361),i=e.r(83485),s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=i.useSyncExternalStore,o=r.useRef,l=r.useEffect,u=r.useMemo,c=r.useDebugValue;n.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var f=o(null);if(null===f.current){var d={hasValue:!1,value:null};f.current=d}else d=f.current;var p=a(e,(f=u(function(){function e(e){if(!l){if(l=!0,a=e,e=r(e),void 0!==i&&d.hasValue){var t=d.value;if(i(t,e))return o=t}return o=e}if(t=o,s(a,e))return t;var n=r(e);return void 0!==i&&i(t,n)?(a=e,t):(a=e,o=n)}var a,o,l=!1,u=void 0===n?null:n;return[function(){return e(t())},null===u?void 0:function(){return e(u())}]},[t,n,r,i]))[0],f[1]);return l(function(){d.hasValue=!0,d.value=p},[p]),c(p),p}},84944,(e,t,n)=>{"use strict";t.exports=e.r(49816)},36524,e=>{"use strict";let t=(0,e.i(4879).default)("gauge",[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]);e.s(["Gauge",0,t],36524)},60013,e=>{"use strict";let t,n;var r=e.i(72400),i=e.i(51361),s=e.i(79513),a=e.i(91305),o=s,l=s;let u=new l.Box3,c=new l.Vector3;class f extends l.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new l.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new l.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new l.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new l.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new l.InterleavedBufferAttribute(r,t,0)),this.setAttribute("instanceColorEnd",new l.InterleavedBufferAttribute(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),u.setFromBufferAttribute(t),this.boundingBox.union(u))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,s=e.count;i<s;i++)c.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(c)),c.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var d=s,p=e.i(82088);let h=parseInt(s.REVISION.replace(/\D+/g,""));class m extends d.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:d.UniformsUtils.clone(d.UniformsUtils.merge([p.UniformsLib.common,p.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new d.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h>=125?"uv1":"uv2",y=new o.Vector4,g=new o.Vector3,S=new o.Vector3,x=new o.Vector4,w=new o.Vector4,b=new o.Vector4,E=new o.Vector3,A=new o.Matrix4,_=new o.Line3,L=new o.Vector3,M=new o.Box3,U=new o.Sphere,z=new o.Vector4;function C(e,t,r){return z.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),z.multiplyScalar(1/z.w),z.x=n/r.width,z.y=n/r.height,z.applyMatrix4(e.projectionMatrixInverse),z.multiplyScalar(1/z.w),Math.abs(Math.max(z.x,z.y))}class B extends o.Mesh{constructor(e=new f,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,s=t.count;e<s;e++,i+=2)g.fromBufferAttribute(t,e),S.fromBufferAttribute(n,e),r[i]=0===i?0:r[i-1],r[i+1]=r[i]+g.distanceTo(S);let i=new o.InstancedInterleavedBuffer(r,2,1);return e.setAttribute("instanceDistanceStart",new o.InterleavedBufferAttribute(i,1,0)),e.setAttribute("instanceDistanceEnd",new o.InterleavedBufferAttribute(i,1,1)),this}raycast(e,r){let i,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let u=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,f=this.geometry,d=this.material;if(n=d.linewidth+u,null===f.boundingSphere&&f.computeBoundingSphere(),U.copy(f.boundingSphere).applyMatrix4(c),a)i=.5*n;else{let e=Math.max(l.near,U.distanceToPoint(t.origin));i=C(l,e,d.resolution)}if(U.radius+=i,!1!==t.intersectsSphere(U)){if(null===f.boundingBox&&f.computeBoundingBox(),M.copy(f.boundingBox).applyMatrix4(c),a)s=.5*n;else{let e=Math.max(l.near,M.distanceToPoint(t.origin));s=C(l,e,d.resolution)}M.expandByScalar(s),!1!==t.intersectsBox(M)&&(a?function(e,r){let i=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,u=Math.min(s.instanceCount,a.count);for(let s=0;s<u;s++){_.start.fromBufferAttribute(a,s),_.end.fromBufferAttribute(l,s),_.applyMatrix4(i);let u=new o.Vector3,c=new o.Vector3;t.distanceSqToSegment(_.start,_.end,c,u),c.distanceTo(u)<.5*n&&r.push({point:c,pointOnLine:u,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:s,uv:null,[v]:null})}}(this,r):function(e,r,i){let s=r.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,u=e.geometry,c=u.attributes.instanceStart,f=u.attributes.instanceEnd,d=Math.min(u.instanceCount,c.count),p=-r.near;t.at(1,b),b.w=1,b.applyMatrix4(r.matrixWorldInverse),b.applyMatrix4(s),b.multiplyScalar(1/b.w),b.x*=a.x/2,b.y*=a.y/2,b.z=0,E.copy(b),A.multiplyMatrices(r.matrixWorldInverse,l);for(let r=0;r<d;r++){if(x.fromBufferAttribute(c,r),w.fromBufferAttribute(f,r),x.w=1,w.w=1,x.applyMatrix4(A),w.applyMatrix4(A),x.z>p&&w.z>p)continue;if(x.z>p){let e=x.z-w.z,t=(x.z-p)/e;x.lerp(w,t)}else if(w.z>p){let e=w.z-x.z,t=(w.z-p)/e;w.lerp(x,t)}x.applyMatrix4(s),w.applyMatrix4(s),x.multiplyScalar(1/x.w),w.multiplyScalar(1/w.w),x.x*=a.x/2,x.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,_.start.copy(x),_.start.z=0,_.end.copy(w),_.end.z=0;let u=_.closestPointToPointParameter(E,!0);_.at(u,L);let d=o.MathUtils.lerp(x.z,w.z,u),h=d>=-1&&d<=1,m=E.distanceTo(L)<.5*n;if(h&&m){_.start.fromBufferAttribute(c,r),_.end.fromBufferAttribute(f,r),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let n=new o.Vector3,s=new o.Vector3;t.distanceSqToSegment(_.start,_.end,s,n),i.push({point:s,pointOnLine:n,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,[v]:null})}}}(this,l,r))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(y),this.material.uniforms.resolution.value.set(y.z,y.w))}}class O extends f{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(3===t)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class R extends B{constructor(e=new O,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let j=i.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:o,lineWidth:l,segments:u,dashed:c,...d},p){var h,v;let y=(0,a.useThree)(e=>e.size),g=i.useMemo(()=>u?new B:new R,[u]),[S]=i.useState(()=>new m),x=(null==n||null==(h=n[0])?void 0:h.length)===4?4:3,w=i.useMemo(()=>{let r=u?new f:new O,i=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof s.Color?e.toArray():e);r.setColors(e.flat(),x)}return r},[e,u,n,x]);return i.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),i.useLayoutEffect(()=>{c?S.defines.USE_DASH="":delete S.defines.USE_DASH,S.needsUpdate=!0},[c,S]),i.useEffect(()=>()=>{w.dispose(),S.dispose()},[w]),i.createElement("primitive",(0,r.default)({object:g,ref:p},d),i.createElement("primitive",{object:w,attach:"geometry"}),i.createElement("primitive",(0,r.default)({object:S,attach:"material",color:t,vertexColors:!!n,resolution:[y.width,y.height],linewidth:null!=(v=null!=o?o:l)?v:1,dashed:c,transparent:4===x},d)))});e.s(["Line",0,j],60013)},91665,e=>{"use strict";var t=e.i(61129),n=e.i(51361),r=e.i(79513),i=e.i(73942),s=e.i(60013),a=e.i(10974),o=e.i(24328);e.i(44006);var l=e.i(70774),u=e.i(86007),c=e.i(30792),f=e.i(94945);let d=1/240,p=Math.PI/180;function h({getBobPosition:e,activeRef:s,seqRef:a,headColor:o,fadeToColor:l,maxPoints:u=110}){let{lineObject:c,geometry:f,positionAttribute:d}=(0,n.useMemo)(()=>{let e=new r.BufferGeometry,t=new Float32Array(3*u),n=new Float32Array(3*u),i=new r.Color(o),s=new r.Color(l);for(let e=0;e<u;e++){let t=s.clone().lerp(i,e/(u-1));n[3*e]=t.r,n[3*e+1]=t.g,n[3*e+2]=t.b}e.setAttribute("position",new r.BufferAttribute(t,3)),e.setAttribute("color",new r.BufferAttribute(n,3)),e.setDrawRange(0,0);let a=new r.LineBasicMaterial({vertexColors:!0,transparent:!0,opacity:.85}),c=new r.Line(e,a);return c.frustumCulled=!1,{lineObject:c,geometry:e,positionAttribute:e.getAttribute("position")}},[u,o,l]);(0,n.useEffect)(()=>()=>{f.dispose(),c.material.dispose()},[f,c]);let p=(0,n.useRef)([]),m=(0,n.useRef)(-1),v=(0,n.useMemo)(()=>new r.Vector3,[]);return(0,i.useFrame)(()=>{if(a.current!==m.current&&(m.current=a.current,p.current=[]),s.current){let t=e(v);p.current.push([t.x,t.y,t.z]),p.current.length>u&&p.current.shift()}let t=p.current.length;if(t>0){for(let e=0;e<t;e++){let t=p.current[e];d.setXYZ(e,t[0],t[1],t[2])}f.setDrawRange(0,t),d.needsUpdate=!0}else 0!==f.drawRange.count&&f.setDrawRange(0,0)}),(0,t.jsx)("primitive",{object:c})}function m({pivotY:e,length:r,theta0:i,color:a}){let o=(0,n.useMemo)(()=>{let t=[];for(let n=0;n<=48;n++){let s=-i+2*i*n/48;t.push([r*Math.sin(s),e-r*Math.cos(s),0])}return t},[e,r,i]);return(0,t.jsx)(s.Line,{points:o,color:a,lineWidth:1,dashed:!0,dashSize:.05,gapSize:.045,transparent:!0,opacity:.45})}function v({thetaRef:e,pivotY:r,length:s,bobRadius:o}){let l=(0,n.useRef)(null);return(0,i.useFrame)(()=>{l.current&&(l.current.rotation.z=e.current)}),(0,t.jsxs)("group",{ref:l,position:[0,r,0],children:[(0,t.jsxs)("mesh",{position:[0,-s/2,0],castShadow:!0,children:[(0,t.jsx)("cylinderGeometry",{args:[.012,.012,s,10]}),(0,t.jsx)("meshStandardMaterial",{color:"#94a3b8",metalness:.45,roughness:.5})]}),(0,t.jsxs)("mesh",{rotation:[Math.PI/2,0,0],castShadow:!0,children:[(0,t.jsx)("cylinderGeometry",{args:[.045,.045,.18,16]}),(0,t.jsx)("meshStandardMaterial",{color:"#475569",metalness:.6,roughness:.35})]}),(0,t.jsxs)("mesh",{position:[0,-s,0],castShadow:!0,children:[(0,t.jsx)("sphereGeometry",{args:[o,32,24]}),(0,t.jsx)("meshStandardMaterial",{color:a.colors.accentCobalt,metalness:.85,roughness:.25,emissive:a.colors.skyBlue,emissiveIntensity:.06})]})]})}function y({length:e=1,mass:r=.1,initialAngleDeg:i=15,gravity:s=9.80665,damping:g=0,running:S,speed:x=1,showTrail:w=!0,showArc:b=!0,showControls:E=!1,background:A="dark",onStateChange:_,className:L}){let M=void 0===S,U="dark"===A,z=(0,n.useRef)(i*p),C=(0,n.useRef)(0),B=(0,n.useRef)(0),O=(0,n.useRef)(null),R=(0,n.useRef)(null),j=(0,n.useRef)(1),D=(0,n.useRef)(0),P=(0,n.useRef)(i),I=(0,n.useRef)(e),T=(0,n.useRef)(s),V=(0,n.useRef)(g),H=(0,n.useRef)(_);(0,n.useEffect)(()=>{I.current=e},[e]),(0,n.useEffect)(()=>{T.current=s},[s]),(0,n.useEffect)(()=>{V.current=g},[g]),(0,n.useEffect)(()=>{H.current=_},[_]);let G=1.1+e/2,N=(0,n.useMemo)(()=>Math.min(.045+.05*Math.cbrt(Math.max(r,.001)/.1),.18),[r]),W=(0,n.useRef)(!1),F=(0,n.useCallback)(()=>{H.current?.({theta:z.current,omega:C.current,time:B.current,periodEstimate:O.current,periodTheory:2*Math.PI*Math.sqrt(I.current/T.current)})},[]),k=(0,n.useCallback)((e,t)=>{var n,r,i;let s,a,o,l,u,c,f,d;B.current=t;let[p,h]=(n={length:I.current,gravity:T.current,damping:V.current},r=z.current,i=C.current,a=(s=(e,t)=>-(n.gravity/n.length)*Math.sin(e)-n.damping*t)(r,i),o=i+e/2*a,l=s(r+e/2*i,i+e/2*a),u=i+e/2*l,c=s(r+e/2*o,i+e/2*l),f=i+e*c,d=s(r+e*u,i+e*c),[r+e/6*(i+2*o+2*u+f),i+e/6*(a+2*l+2*c+d)]);z.current=p,C.current=h;let m=Math.sign(z.current),v=j.current;if(0!==m&&0!==v&&m!==v){if(m>0){let e=R.current;if(null!==e){let n=t-e;n>.05&&(O.current=n)}R.current=t}j.current=m}else 0!==m&&(j.current=m)},[]),q=(0,n.useCallback)(()=>{z.current=P.current*p,C.current=0,B.current=0,O.current=null,R.current=null,j.current=Math.sign(z.current)||1,D.current+=1,F()},[F]),Y=(0,f.useSimClock)({timestep:d,running:S,speed:x,onStep:k,onReset:q}),{running:K,time:X,play:J,pause:Z,setSpeed:$}=Y;(0,n.useEffect)(()=>{W.current=K},[K]),(0,n.useEffect)(()=>{void 0!==S&&(S?J():Z())},[S,J,Z]),(0,n.useEffect)(()=>{$(x)},[x,$]),(0,n.useEffect)(()=>{K&&F()},[X,K,F]),(0,n.useEffect)(()=>{!1===S&&i!==P.current&&(P.current=i,z.current=i*p,C.current=0,D.current+=1,F())},[i,S,F]);let Q=(0,n.useCallback)(e=>{let t=z.current,n=I.current;return e.set(n*Math.sin(t),G-n*Math.cos(t),0)},[G]);return(0,t.jsxs)("div",{className:(0,o.cn)("relative h-full min-h-64 w-full overflow-hidden",L),children:[(0,t.jsxs)(u.PhysicsScene,{cameraPosition:[3.3,2.1,4.9],cameraFov:42,background:A,fog:!1,showGrid:!0,showAxes:!1,shadows:!0,children:[(0,t.jsx)(l.OrbitControlsWrapper,{target:[0,1.1,0],minDistance:2,maxDistance:12}),(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,.001,0],receiveShadow:!0,children:[(0,t.jsx)("circleGeometry",{args:[3.2,48]}),(0,t.jsx)("meshStandardMaterial",{color:U?"#141f36":"#e6edf6",roughness:.95})]}),(0,t.jsxs)("mesh",{position:[0,G+.16,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[.9,.07,.14]}),(0,t.jsx)("meshStandardMaterial",{color:"#475569",metalness:.5,roughness:.4})]}),b?(0,t.jsx)(m,{pivotY:G,length:e,theta0:Math.abs(i)*p,color:U?a.colors.skyBlue:a.colors.accentCobalt}):null,w?(0,t.jsx)(h,{getBobPosition:Q,activeRef:W,seqRef:D,headColor:U?a.colors.skyBlue:a.colors.accentCobalt,fadeToColor:U?a.colors.bgDark:a.colors.bgLight}):null,(0,t.jsx)(v,{thetaRef:z,pivotY:G,length:e,bobRadius:N})]}),E&&M?(0,t.jsx)(c.SimulationControls,{className:"absolute bottom-4 left-1/2 z-10 w-max max-w-[calc(100%-2rem)] -translate-x-1/2",running:Y.running,onPlayPause:()=>Y.running?Y.pause():Y.play(),onReset:Y.reset,time:Y.time,speed:Y.speed,onSpeedChange:Y.setSpeed}):null]})}e.s(["PendulumScene3D",0,y,"default",0,y])},52010,e=>{e.n(e.i(91665))}]);